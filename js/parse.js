var fs = require("fs");
var data = fs.readFileSync('FoodFacts.csv');
var stringData=data.toString();
var arrayOne= stringData.split('\r\n');


var header=arrayOne[0].split(',');
var sugarIndex,saltIndex,countriesIndex,count=0;
sugarIndex=header.indexOf('sugars_100g');
saltIndex=header.indexOf('salt_100g');
countriesIndex=header.indexOf('countries');


var noOfRow = arrayOne.length;
var noOfCol = header.length;

var jArray=[];
var obj1={};
var i,j;
var arr=["Netherlands", "Canada", "United Kingdom", "Australia", "France", "Germany", "Spain","South Africa"]

for (i = 1; i < noOfRow-1; i++) {
   var myNewLine=arrayOne[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

   obj1[header[countriesIndex]]=myNewLine[countriesIndex];
   obj1[header[sugarIndex]]=myNewLine[sugarIndex];
   obj1[header[saltIndex]]=myNewLine[saltIndex];
   for(j=0;j<arr.length;j++)
    {
     if(obj1.countries==arr[j])
     {
     jArray.push(obj1);
      }
    }
   obj1={};
};
//console.log(jArray);

var jArray1=[];
var sugars_100g=0,salt_100g=0;
for(i=0;i<arr.length;i++)
add(arr[i]);

function add(country)
{
  var obj2={};
  for(var i=0;i<jArray.length;i++)
  {
  if(jArray[i].countries===country&&jArray[i].salt_100g!=''&&jArray[i].sugars_100g!='')
  {
    if(jArray[i].sugars_100g!='')
    {

    sugars_100g+=parseFloat(jArray[i].sugars_100g);
  }
}
}
sugars_100g=sugars_100g;

/*obj2["countries"]=country;
obj2["indicator"]="sugars_100g";
obj2["value"]=sugars_100g;

jArray1.push(obj2);*/
obj2={};

for(var i=0;i<jArray.length;i++)
{
if(jArray[i].countries===country&&jArray[i].salt_100g!=''&&jArray[i].sugars_100g!='')
{
  if(jArray[i].salt_100g!=''){

    salt_100g+=parseFloat(jArray[i].salt_100g);
}
}
}
salt_100g=salt_100g;

/*obj2["indicator"]="salt_100g";
obj2["value"]=salt_100g;

jArray1.push(obj2);*/
obj2={};

obj2["countries"]=country;
//obj2["indicator"]="";
obj2["sugars_100g"]=sugars_100g;
//obj2["indicator"]="";
obj2["salt_100g"]=salt_100g;
jArray1.push(obj2);
sugars_100g=0;
salt_100g=0;
}


var file = 'data2.json';
var obj=JSON.stringify(jArray1);
console.log( jArray1);
fs.writeFileSync(file, obj);
