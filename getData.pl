#!/usr/bin/env perl
use warnings;
use strict;

open(FILE,"metabolites.txt") or die "not opened!";
open(OUTPUT, ">","input.txt") or die "not written!";
my $p = <FILE>; #Get rid of first line.
while ($p = <FILE>) {
 chomp $p;
 my @a = split(/[\t]/,$p);
 my @arr;
 for (my $i = 0; $i < @a+0; $i++) {
  if ($a[$i] ne "") {
   if ($i == 2) { $a[$i] *= -1; };
   push(@arr,$a[$i]);
  }
 }
 #print "@arr\n";
 if (!$arr[2]) {}
 else {
  print OUTPUT "$arr[0]\t$arr[1]\t$arr[2]\n";
 }
}
