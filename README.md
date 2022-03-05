# PAY MY BILLS

Pay My Bills is a web app that helps you to, you guessed it, pay your bills !

Do you have problems keeping up with all the bills you have to pay ? no ? just me ?

well, I built this web app for myself, but you can use it if you like !


![pay my bills](https://i.ibb.co/jMhqc1g/pay-my-bills.png)

It is actually very simple:   
you register a new bill with the name, the next expiration date and url to access the website of the bill,  
the bill item will keep up with the expiration day and warn you by status colors:
  - **green**: just paid
  - **blue**: far from expiration
  - **yellow**: close from expiration
  - **red**: late

remember, the app only lets you click to "pay the bill" on the yellow or red status,  
once you click to pay the bill (after typing the value) it will reset for the next month and register the payment on the Payment History section


the first functional prototype is ready, but there is a MILLION things to improve,  
small things like a edit bill function and big things like a line chart component

### here is the node API: <a href="https://github.com/akiosTerr/pay-my-bills-api">pay-my-bills-api</a>  
to use it, just put your mongo URI on the config file, you know how it is


*like always, feel free to make suggestions!*
