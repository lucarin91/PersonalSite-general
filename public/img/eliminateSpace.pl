#!/usr/bin/perl -w
@files = <*>;
foreach $file (@files) {
  my $newName = $file =~ s/ /_/g;
  rename $newName,$file;
}
