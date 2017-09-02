#!/usr/bin/env perl
use warnings;
use strict;

open(FILE,"m_pathway_zscore.txt") or die "not opened!";
open(OUTPUT, ">","input.txt") or die "not written!";
my @strain;
my @compound;
my @val;

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
 if (!$arr[2]) {}
 else {
  strain.push($arr[0]);
  compound.push($arr[1]);
  val.push($arr[2]);
  #print OUTPUT "$arr[0]\t$arr[1]\t$arr[2]\n";
 }
}

#Now lets order it. Lets use merge sort.
#Split to first half arr, second half arr.
#split each into first half arr, second half arr, etc.
#once there is only one element, then return that arr.
#once the first function returns an ordered array, enact a second function
#second function pops an element of each and places the smaller until merged.






