#!/bin/bash

vagrant up &&
VBoxManage controlvm win10-chromium-nvda setvideomodehint 1280 720 32 &&
vagrant snapshot save nvda &&
vagrant halt -f
