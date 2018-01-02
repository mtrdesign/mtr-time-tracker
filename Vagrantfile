# -*- mode: ruby -*-
# vi: set ft=ruby :
require 'etc'

Vagrant.configure("2") do |config|
  config.vm.box = "trusty64"
  config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64/versions/20160707.0.1/providers/virtualbox.box"
  config.vm.hostname = "mtr-time-tracker"
  config.vm.provision "shell", path: "vmachines/vagrant/increase_swap.sh"

  # config.vm.provision :shell, :path => "bootstrap.sh", :args => Etc.getlogin
  config.vm.synced_folder ".", "/srv/project", id: "vagrant-root",
    owner: "vagrant",
    group: "www-data",
    mount_options: ["dmode=775", "fmode=764"], :nfs => ENV.fetch('MTR_VAGRANT_USE_NFS', false)

  # config.vm.network(:private_network, ip: "10.254.254.254") if ENV.fetch('MTR_VAGRANT_USE_NFS', false)
  config.vm.network :forwarded_port, guest: 8000, host: 8000       # used by Django dev server
  config.vm.network :forwarded_port, guest: 8080, host: 8080       # used by Django dev server
  config.vm.network :forwarded_port, guest: 3306, host: 3308       # used by Django dev server
  config.vm.network :forwarded_port, guest: 8888, host: 8888       # used by Docker Django dev server
  config.vm.network :forwarded_port, guest: 4200, host: 4200       # used by Docker Angular dev server

  config.vm.provider :virtualbox do | vb |
    vb.name = "mtr-time-tracker"
    vb.customize ["modifyvm", :id, "--rtcuseutc", "on"]
    vb.customize ["modifyvm", :id, "--memory", ENV.fetch('MTR_VAGRANT_RAM', 1024)]
    vb.customize ["modifyvm", :id, "--cpus", ENV.fetch('MTR_VAGRANT_CPUS', 1)]
  end
end