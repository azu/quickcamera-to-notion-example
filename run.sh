#!/bin/bash

declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare NODE="/path/to/node" # karabinerではPATHは読み込まれないので絶対パス
${NODE} "${scriptDir}/upload-image.mjs"
