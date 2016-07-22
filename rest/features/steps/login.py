from behave import *

use_step_matcher("re")


@given("I see login form")
def step_impl(context):
    context.browser.get("http://www.time-tracking.mtr/")
    context.browser.implicitly_wait(3)
    url = context.browser.current_url
    assert "http://www.time-tracking.mtr/#/login" in url

@step("I fill the form with invalid values")
def step_impl(context):
     context.browser.find_element_by_id("NoK9Xxglls").send_keys("tester")
     context.browser.find_element_by_id("fq7X1zhPP2").send_keys("tester123")

@step("I fill the form with valid values")
def step_impl(context):
     context.browser.find_element_by_id("NoK9Xxglls").send_keys("sve")
     context.browser.find_element_by_id("fq7X1zhPP2").send_keys("tester123")

@step("I submit the form")
def step_impl(context):
     context.browser.find_element_by_xpath("//form//button[@type='submit']").click()

@then("I see the error message")
def step_impl(context):
    alert_is_showed = context.browser.find_element_by_xpath('//div[@class="container"]//div[contains(@class, "alert")]').is_displayed()
    assert alert_is_showed

@then("I dont see the error message")
def step_impl(context):
    alert_is_showed = context.browser.find_element_by_xpath('//div[@class="container"]//div[contains(@class, "alert")]').is_displayed()
    assert alert_is_showed in False


