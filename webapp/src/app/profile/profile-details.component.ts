
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { RootService } from './../core/root.service';
import { UserService } from './../shared/user.service';

import { User } from './../models/user.model';

@Component({
  templateUrl: './profile-details.component.html'
})
export class ProfileDetailsComponent implements OnInit {

  user: User;
  profileForm: FormGroup;
  securityForm: FormGroup;

  // String messages containing the form submission results
  profileFormSuccessMessage: string;
  profileFormErrorMessage: string;

  securityFormSuccessMessage: string;
  securityFormErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private rootService: RootService,
    private userService: UserService) {
    this.createProfileDetailsForm();
    this.createSecurityForm();
  }

  /**
   * Get data about the user, because we want to fill the form with the existing data
   */
  ngOnInit() {
    // Get data about the logged user and pass it to fill the form data
    this.user = this.rootService.user;
    this.fillProfileDetailsForm();

    this.userService.getUser(this.user)
                    .subscribe(
                      user => {
                        // Get the values only from the fileds that matter, don't override the whole object
                        this.user.email = user.email;
                        this.user.firstName = user.firstName;
                        this.user.lastName = user.lastName;
                        this.user.jobTitle = user.jobTitle;
                        this.user.phoneNumber = user.phoneNumber;

                        this.fillProfileDetailsForm();
                      },
                      error => this.profileFormErrorMessage = error
                    );

  }

  /**
   * Build the Profile Details form and setup some validation rules
   */
  createProfileDetailsForm() {
    this.profileForm = this.fb.group({
      username: [{value: '', disabled: true}, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: '',
      phoneNumber: '',
    });
  }

  createSecurityForm() {
    this.securityForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Fill the Profle Details form with default values, obtained from the logged user's object
   */
  fillProfileDetailsForm() {
    this.profileForm.setValue({
      username: this.user.username || '',
      email: this.user.email || '',
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      jobTitle: this.user.jobTitle || '',
      phoneNumber: this.user.phoneNumber || '',
    });
  }

  /**
   * Submit the Profile Details form and handle the result
   */
  onProfileDetailsFormSubmit() {
    this.user = this.prepareSaveUser(this.user);
    this.userService.updateUser(this.user)
                    .subscribe(
                      user => {
                        this.profileFormSuccessMessage = 'Your profile details has been successfully updated.';
                        setTimeout(() => this.profileFormSuccessMessage = '', 3000);
                      },
                      error => this.profileFormErrorMessage = error
                    );

    this.profileForm.reset();
    this.fillProfileDetailsForm();
  }

  /**
   * Submit the Secirity form and handle the result
   */
  onSecurityFormSubmit() {
    let data = this.prepareSetPassword();
    this.userService.setPassword(this.user, data)
                    .subscribe(
                      response => {
                        if (response.id) {
                          this.securityFormSuccessMessage = 'Your password has been successfully updated.';
                          setTimeout(() => this.securityFormSuccessMessage = '', 3000);
                        }
                        else {
                          if (response.current_password) {
                            this.securityFormErrorMessage = '<strong>Current Password</strong> doesn\'t match with the existing profile password.';
                            setTimeout(() => this.securityFormErrorMessage = '', 3000);
                          }
                          else if (response.new_password) {
                            this.securityFormErrorMessage = '<strong>New Password</strong> and <strong>Confirm Password</strong> doesn\'t match.';
                            setTimeout(() => this.securityFormErrorMessage = '', 3000);
                          }
                        }
                      },
                      error => this.securityFormErrorMessage = error
                    );

    this.securityForm.reset();
  }

  /**
   * Get the entered data in the form and serialize it as a User object, ready to pass it to the UserService
   * Returns new `User` object containing a combination of original user value(s) and deep copies of changed form model values
   * @param  {User} user
   * @return {User}
   */
  prepareSaveUser(user: User): User {
    const formModel = this.profileForm.value;

    const saveUser: User = {
      id: user.id as number,
      username: user.username as string,
      token: user.token as string,

      email: formModel.email as string,
      firstName: formModel.firstName as string,
      lastName: formModel.lastName as string,
      jobTitle: formModel.jobTitle as string,
      phoneNumber: formModel.phoneNumber as string,
    };

    return saveUser;
  }

  /**
   * Get the entered data in the form and serialize it, to be ready for the API
   * @return {any} [description]
   */
  prepareSetPassword(): any {
    const formModel = this.securityForm.value;

    const data = {
      current_password: formModel.currentPassword,
      new_password: formModel.newPassword,
      confirm_new_password: formModel.confirmNewPassword
    }

    return data;
  }
}
