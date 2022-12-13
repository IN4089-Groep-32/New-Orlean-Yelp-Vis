#!/usr/bin/env bash
for filename in ./box/*.json; do
    filesize=`ls -l $filename | awk '{ print $5 }'`
    minsize=$((102))
    if [ $filesize -lt $minsize ]
    then
        echo "$filename"
    fi
done