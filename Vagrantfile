# -*- mode: ruby -*-
# vi: set ft=ruby :
require 'etc'

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty32"
  config.vm.hostname = "mtr-time-tracker-v2"
  config.vm.provision "shell", path: "vmachines/vagrant/increase_swap.sh"

  # config.vm.provision :shell, :path => "bootstrap.sh", :args => Etc.getlogin
  config.vm.synced_folder ".", "/srv/project", id: "vagrant-root",
    owner: "vagrant",
    group: "www-data",
    mount_options: ["dmode=775", "fmode=764"], :nfs => ENV.fetch('MTR_VAGRANT_USE_NFS', false)

  config.vm.network(:private_network, ip: "10.254.254.254") if ENV.fetch('MTR_VAGRANT_USE_NFS', false)
  config.vm.network :forwarded_port, guest: 8000, host: 8000        # used by Django dev server
  config.vm.network :forwarded_port, guest: 3306, host: 3308        # used by Django dev server
  config.vm.network :forwarded_port, guest: 4200, host: 4200        # used by Angular server
  config.vm.network :forwarded_port, guest: 3000, host: 3000        # used by Angular server

  config.vm.provider :virtualbox do | vb |
    vb.name = "mtr-time-tracker-v2"
    vb.customize ["modifyvm", :id, "--rtcuseutc", "on"]
    vb.customize ["modifyvm", :id, "--memory", ENV.fetch('MTR_VAGRANT_RAM', 1024)]
    vb.customize ["modifyvm", :id, "--cpus", ENV.fetch('MTR_VAGRANT_CPUS', 1)]
  end
end
