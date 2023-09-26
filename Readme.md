# index.html
in this file firlsty we have a header  then we have two div container and inside of those we have a search box and a reset button 


then we have sliders for price range serm and ph 
            
then we have a beerList div which willl show the data on the card 
then we have a div for pagination whioch will show the functionalty of pagination through javascript            
       

# index.js

in this file we are getting the elements from the html through theor id 
then we have a variable for items to show per pge 
then we are defining the current page 
then we have an empty array which will store the beer data 

after that we have default value for srm and ph 

then we have a function to fetch the data and render 
inside of this we are storing the data into the api url 


then we are fetching the data withc try block 
then we are setting the beelist empty to clear previous result 

    
    then we are rendering the beer cards for current page 
    and we are appending that to a div called beerList

    then we are rendering the pagination with the data on each page after that we have a catch block if there is any error than it will show that error 
        
then we have  Function to render pagination controls with a specific range of page numbers
function renderPagination(totalPages) {
    pagination.innerHTML = '';

then we have  Defined the range of page numbers to display around the current page
    const pageRange = 7; 

the we have a previous button to show which will work when we move to another page so we can move to previous page     

   then we are creting the nummeric page buttons for the pagination 
   inside of this we have first few pages to display and last few pages to display 

    then we have an event listener click for the page button 

then we have condistion for the elipsis for middle range before and after 

    then we have a functon for filtering the data based on the sliders         

    then we have a function to render the beer card with all the data to be displayed over the card 

        
then we have a event listener for serch input to take the user input 
then we have an event listener for the reset button which will reset the value of the search button and move to current pge 

then we hve event listener for the srm ph and price range which contains empty value initialy and we are converting the value into float then we have given te tofixed which sets the text content of the  price srmValue  and ph element to a formatted string
then we are calling the filterbeersbyslider in which we are passing the serm price and ph 
then we are sending it to beercards 
then we have math.ceil by calling the render pagination of the page which will give filterd item divided by items per paeg 

same thing we have for srm and ph 
the we are calling the main functin fetchandRenderBeers 




