#const n=4.

% n-Queens encoding
1 { q(I,1..n) } 1 :- I = 1..n.
1 { q(1..n,J) } 1 :- J = 1..n.
:- 2 { q(D-J,J) }, D = 2..2*n.
:- 2 { q(D+J,J) }, D = 1-n..n-1.
