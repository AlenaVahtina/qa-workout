var bookURL = "https://41632c27-6d08-4e31-adfc-3319e454db95.mock.pstmn.io"

function addBook() {
  var book = document.getElementById("addBook");
  var x = book.value.split(" ");
  bookData={author: x[0], name: x[1], id: "3"};
  console.log(bookData);
    httpGetAsync(bookURL+"/book","POST", function f(data){
      console.log(data);
    },JSON.stringify(bookData));
  
}


function httpGetAsync(theUrl, type, callback, body = null)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 ){
          if( xmlHttp.status == 200)
            callback(xmlHttp.responseText);    
          else
            console.log("error");
        }
    }
    xmlHttp.open(type, theUrl, true);
    xmlHttp.send(body);
}


function readBook() {
    var rad=document.getElementsByName('r1');
    var author="";
    var bookName="";
    var listBook="";
    for (var i=0;i<rad.length; i++) {
        if (rad[i].checked && rad[i].value == "one") {
            httpGetAsync(bookURL+"/book","GET", function f(data){
              console.log(data);   
              JSON.parse(data, function(key, value) {
              if (key === 'author') { author=value; }
              if (key === 'name') { bookName=value; }
            });                
              document.getElementById("bookRead").innerHTML = author+" "+bookName;
            });
        }
        if (rad[i].checked && rad[i].value == "list") {
            httpGetAsync(bookURL+"/books","GET", function f(data){
              console.log(data);
              data = JSON.parse(data)
              console.log(data);
              for (i in data.books){
                b = data.books[i];
                console.log("books[i]:"+b);
                author=b.author;
                bookName=b.name;
                listBook += author+" "+bookName+"\n";

                console.log(listBook);
               }              
            document.getElementById("bookRead").innerHTML = listBook;
            });
        }
    }
}


// function deleteBook(){
//   httpGetAsync(bookURL+"/book","DELETE", function f(data){
//     console.log(data);
//   });
// }