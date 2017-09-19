#!/usr/bin/env perl

use strict;
use warnings;

open(FILE,"metaboliteZscore.txt") or die "not opened!";
open(OUTPUT, ">", "input.txt") or die "not written!";

my @metabolites;
my @strains;
my @zscores;

my $line;
$line = <FILE>;
my @arr;
@metabolites = split(/[\t\n]/, $line);


my $i = 0;
while ($line = <FILE>) {
 $i++;
 chomp $line;
 @arr = split(/[\t\n]/,$line);
 push(@strains, $arr[0]);
 push(@zscores, "@arr[1..83]");
}

print OUTPUT "@strains\n";
print OUTPUT "@metabolites\n";
print @metabolites+0, "\n";
print OUTPUT "@zscores";

#alright. In the js, just get every x % 85 == 0 element for y.




