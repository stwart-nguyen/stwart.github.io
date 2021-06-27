---
layout: post
title: Calling a function multiple times in PostgreSQL affect query performance?
excerpt: Volatility classification of functions in PostgreSQL
categories: [database, postgresql]
share: false
image:
  feature: img/pixeltrue/minimalistic-illustrations/Build-Product-Colored.json
  credit: pixeltrue minimalistic-illustrations
  creditlink: https://www.pixeltrue.com/free-packs/minimalistic-illustrations#preview
  type: json_adobe_after_effect
---
{% highlight sql %}
  SELECT
    id,
    array_agg(status) AS statuses,
    array_agg(status) && ARRAY['some_status'] AS flagA_on,
    array_agg(status) && ARRAY['other_status'] AS flagB_on
  FROM table_1
  GROUP BY foreign_key
{% endhighlight %}
Is invoking `array_agg(status)` many times could cause a performance penalty?

I ended up googling things like: `assign function result to SQL variable`, `call the same function multiple times in the same query`, etc.

Frankly, you dont have to find out a way to assign the result to variable

The only thing you need is to be aware of the volatility type of a function being used [^1]

> Volatility in postgreSQL means whether the function’s result depends only on its input arguments, or is affected by outside factors

It's familiar to [volatile keyword in c](https://www.geeksforgeeks.org/understanding-volatile-qualifier-c-set-1-introduction/)[^2]

# Function Volatility Categories

##### 1. VOLATILE
VOLATILE functions can return **different results on calls with the same arguments**, they will be re-evaluated at EVERY ROW

##### 2. STABLE
STABLE functions return the **same results given the same arguments for all rows within a single statement**

##### 3. IMMUTABLE
IMMUTABLE functions return the **same results given the same arguments FOREVER**

# Check volatility of any function in PostgreSQL
We will use *pg_proc*[^3] to check the volatility

1. Log into PostgreSQL command line `psql postgres`
2. type in `select provolatile from pg_proc where proname=<function_name>;`

  e.g: `select provolatile from pg_proc where proname='array_agg';`

Compare the output to determine that function's volatility

v: VOLATILE

s: STABLE

i: IMMUTABLE

# So does calling array_agg(status) make it slow?
The answer is no, function *array_agg* is an IMMUTABLE function, the optimizer to pre-evaluate the function when a query calls it with constant arguments

It doesn't matter how many time `array_agg(status)` is invoked, this function will be evaluated **ONCE** in that query

When the invocation of a same function occurs more than once in your query, you might need to check its volatility to make sure it wont slow down your query

# References
[^1]: [Function Volatility Categories](https://www.postgresql.org/docs/current/xfunc-volatility.html)
[^2]: [https://www.geeksforgeeks.org/understanding-volatile-qualifier-c-set-1-introduction/](https://www.geeksforgeeks.org/understanding-volatile-qualifier-c-set-1-introduction/)
[^3]: [https://www.postgresql.org/docs/9.3/catalog-pg-proc.html](https://www.postgresql.org/docs/9.3/catalog-pg-proc.html)
