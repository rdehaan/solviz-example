location(table).
location(X) :- block(X).
holds(F,0) :- init(F).

#const end_time=3.
time(1..end_time).

{ move(X,Y,T) : block(X), location(Y), X != Y } = 1 :- time(T).

:- move(X,Y,T), holds(on(A,X),T-1), time(T), time(T-1).
:- move(X,Y,T), holds(on(B,Y),T-1), B != X, Y != table, time(T).

moved(X,T) :- move(X,Y,T), time(T).
holds(on(X,Y),T) :- move(X,Y,T), time(T).
holds(on(X,Z),T) :- holds(on(X,Z),T-1), not moved(X,T), time(T).

:- goal(F), not holds(F,end_time).

block(b0).
block(b1).
block(b2).

init(on(b1,table)).
init(on(b2,b0)).
init(on(b0,table)).

goal(on(b1,b0)).
goal(on(b2,b1)).
goal(on(b0,table)).

#show move/3.
