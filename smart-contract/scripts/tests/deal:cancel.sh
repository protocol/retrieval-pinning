#!/bin/bash

if [ $1 == "hardhat" ]
then
yarn task deploy $1
yarn task setup $1
fi

yarn task deal:create $1
yarn task deal:cancel $1