# Test setup

Run and deploy at deno deploy.

## Test Noop

Test a hang connection on DD.

`/noop?N=1`

Parameters:
- N: Seconds to wait

## Test CPU

Test a render string on preact.

`/cpu?N=30&C=3&O=0`

Parameters:
- N: Number of nodes on each level
- C: Depth of nodes
- O: Should output render? 0 = no, 1 = yes

## Test Data

Download data from some sites

Parameters:
- address1: URI encoded to download 
- address2: URI encoded to download
- ...
