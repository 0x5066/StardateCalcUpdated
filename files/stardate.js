// STARDATE - Version 1.0
// created by Andreas Schmidt, July 2002
// inspired by the Star Trek Series
// calculates the Stardate out of an given date,
// and vice versa.
// Base: 1.1.2323, 0:00 Uhr => Stardate 0

// if year is leapyear then x=366 else x=365
// earthdate=year+1/x*(day-1+hour/24+min/1440+sec/86400)
// stardate=1000*(earthtime-2323)

// Generates long Month Name
// Input parameter are Month#, Language
function LangNamMon(M,L)
{
 if (L == "D")
 {
  switch(M)
  {
   case 1:
    var MonatA = "Januar";
    break;
   case 2:
    var MonatA = "Februar";
    break;
   case 3:
    var MonatA = "M\344rz";
    break;
   case 4:
    var MonatA = "April";
    break;
   case 5:
    var MonatA = "Mai";
    break;
   case 6:
    var MonatA = "Juni";
    break;
   case 7:
    var MonatA = "Juli";
    break;
   case 8:
    var MonatA = "August";
    break;
   case 9:
    var MonatA = "September";
    break;
   case 10:
    var MonatA = "Oktober";
    break;
   case 11:
    var MonatA = "November";
    break;
   case 12:
    var MonatA = "Dezember";
    break;
  }
 }

 if (L == "E")
 {
  switch(M)
  {
   case 1:
    var MonatA = "January";
    break;
   case 2:
    var MonatA = "February";
    break;
   case 3:
    var MonatA = "March";
    break;
   case 4:
    var MonatA = "April";
    break;
   case 5:
    var MonatA = "May";
    break;
   case 6:
    var MonatA = "June";
    break;
   case 7:
    var MonatA = "July";
    break;
   case 8:
    var MonatA = "August";
    break;
   case 9:
    var MonatA = "September";
    break;
   case 10:
    var MonatA = "October";
    break;
   case 11:
    var MonatA = "November";
    break;
   case 12:
    var MonatA = "December";
    break;
  }
 }
 return MonatA;
}

// Validates the given date
// Input parameters are Year, Month#, Day, Language, MonthName
function DatumCheck(J,M,T,L,MA)
{
 if ((M == "4" || M == "6" || M == "9" || M == "11") && (T > 30))
 {
  if (L == "D")
  {
   alert("Falsches Datum: Der Monat " + MA + " hat nur 30 Tage!");
   return false;
  }
  if (L == "E")
  {
   alert("Wrong Date: " + MA + " has only 30 days!");
   return false;
  }
 }
 if (M == "2")
 {
  if (Schaltjahr(J) == true)
  {
   if (T > 29)
   {
    if (L == "D")
    {
     alert("Falsches Datum: Der Februar im Jahr " + J + " hat nur 29 Tage!");
     return false;
    }
    if (L == "E")
    {
     alert("Wrong Date: February in " + J + " has only 29 days!");
     return false;
    }
   }
  }
  else
  {
   if (T > 28)
   {
    if (Lang == "D")
    {
     alert("Falsches Datum: Der Februar im Jahr " + J + " hat nur 28 Tage!");
     return false;
    }
    if (Lang == "E")
    {
     alert("Wrong Date: February in " + J + " has only 28 days!");
     return false;
    }
   }
  }
 }
}

// Boolean function to check a leap year
// Input parameter is the given year
function Schaltjahr(J)
{
 if (J % 100 == 0)
 {
  if (J % 400 == 0)
  {
   return true;
  }
 }
 else
 {
  if ((J % 4) == 0)
  {
   return true;
  }
 }
 return false;
}

// Main function to generate the StarDate
function StarDate()
{
var Lang = document.Eingabe.Sprache.value;
var Jahr = Number(document.Eingabe.Jahr.options[document.Eingabe.Jahr.options.selectedIndex].value);
var monat1 = document.Eingabe.Monat.options[document.Eingabe.Monat.options.selectedIndex].value;
Monat = Number(monat1) + 1;
var Tag = Number(document.Eingabe.Tag.options[document.Eingabe.Tag.options.selectedIndex].value);
var Stunde = Number(document.Eingabe.Stunde.options[document.Eingabe.Stunde.options.selectedIndex].value);
var Min = Number(document.Eingabe.Minute.options[document.Eingabe.Minute.options.selectedIndex].value);
var Sec = Number(document.Eingabe.Sekunde.options[document.Eingabe.Sekunde.options.selectedIndex].value);

var MonatA = LangNamMon(Monat,Lang);

if (DatumCheck(Jahr,Monat,Tag,Lang,MonatA) == false)
{
 return false;
}

var heute = new Date();

//var jahr = heute.getFullYear();
// 0 = Jan, 1 = Feb, usw.
//var monat = heute.getMonth() + 1;
//var tag = heute.getDate();
//var stunde = heute.getHours();
//var min = heute.getMinutes();
//var sec = heute.getSeconds();

//var jahr = 2322;
//var monat = 1;
//var tag = 1;
//var stunde = 0;
//var min = 0;
//var sec = 0;

if (Schaltjahr(Jahr))
{
 var xday = 366;
 var TagArray = new Array(0,31,60,91,121,152,182,213,244,274,305,335);
}
else
{
 var xday = 365;
 var TagArray = new Array(0,31,59,90,120,151,181,212,243,273,304,334);
}

// Day of the Year
DoY= TagArray[Monat - 1] + Tag - 1;

// document.write("jahr: " + jahr + "<br>monat: " + monat + "<br>tag: " + tag + "<br>stunde: " + stunde + "<br>min: " + min + "<br>sec: " + sec + "<br>doy: " + doy + "<br>xday: " + xday)

earthdate = Jahr +  ( DoY + ( Stunde / 24 ) + ( Min / 1440 ) + ( Sec / 86400 ) ) / xday ;
stardate = 1000 * ( earthdate - 2323 );

document.Eingabe.Sternendatum.value = stardate;
// document.write("<br>heute: " + heute + "<br>Erdendatum: " + earthdate + "<br>Sternenzeit: " + stardate);
}

// Restwertbestimmung
// Input parameters are the Value and the Modulo Factor
function modulo(Wert,Divisor)
{
 var RW = Wert;
 while (RW > 0)
 { RW = Wert - Divisor;
   if (RW < 0) { return Math.floor(Wert); } else { Wert = RW };
 }
}

// Calculates the Date by using the DoY as Input parameter
function monatmod(t)
{
 t = t + 1
 var RW = t; RW = t - 31;
 if (RW <= 0) { return fOutM(t,1,Lang); }
 else
 { t = RW ; RW = t - 28 - xday + 365;
   if ( RW <= 0 ) { return fOutM(t,2,Lang); }
   else
  { t = RW ; RW = t - 31;
    if ( RW <= 0 ) { return fOutM(t,3,Lang); }
    else
    { t = RW ; RW = t - 30;
      if ( RW <= 0 ) { return fOutM(t,4,Lang); }
      else
      { t = RW ; RW = t - 31;
        if ( RW <= 0 ) { return fOutM(t,5,Lang); }
        else
        { t = RW ; RW = t - 30;
          if ( RW <= 0 ) { return fOutM(t,6,Lang); }
          else
          { t = RW ; RW = t - 31;
            if ( RW <= 0 ) { return fOutM(t,7,Lang); }
            else
            { t = RW ; RW = t - 31;
              if ( RW <= 0 ) { return fOutM(t,8,Lang); }
              else
              { t = RW ; RW = t - 30;
                if ( RW <= 0 ) { return fOutM(t,9,Lang); }
                else
                { t = RW ; RW = t - 31;
                  if ( RW <= 0 ) { return fOutM(t,10,Lang); }
                  else
                  { t = RW ; RW = t - 30;
                    if ( RW <= 0 ) { return fOutM(t,11,Lang); }
                    else
                    { t = RW ; RW = t - 31;
                      if ( RW <= 0 ) { return fOutM(t,12,Lang); }
}}}}}}}}}}}
}

// Produces the final Date output depending on language
// Input parameters are Day, Month#, Language
function fOutM(T,M,L)
{
 if (L == "D") { return T + "." + LangNamMon(M,L) + " "; }
 else { return LangNamMon(M,L) + " " + T + ", "; }
}

// Produces the final Time output depending on language
// Input parameters are Hour, Minute, Seconds, Language
function fOutT(H,M,S,L)
{
 var x = "00" + String(H); var fH = x.substr(x.length - 2,2);
 var x = "00" + String(M); var fM = x.substr(x.length - 2,2);
 var x = "00" + String(S); var fS = x.substr(x.length - 2,2);
 if (L == "D") { return ", Uhrzeit: " + fH + ":" + fM + ":" + fS; }
 else { return ", Time: " + fH + ":" + fM + ":" + fS; }
}

function StarTimeCheck(T)
{
 if (String(Number(T)) == "NaN")
 {
  if (Lang == "D") { alert("Bitte geben Sie eine g\374ltige Zahl ein!\n(Ein Punkt als Dezimalzeichen!)"); return false }
  else { alert("Please give a valid number!\n(Decimal Point)"); return false }
 }
}

// Main function to generate the non-StarTrek date format
// out of a given Stardate
function EarthTime()
{
var Lang = document.Eingabe.Sprache.value;
var StarTime = document.Ausgabe.Sternenzeit.value;

if (StarTimeCheck(StarTime) == false) { return false; }

earthdate = ( StarTime / 1000 ) + 2323;
earthdates = String(earthdate) + ".0";
vektor = earthdates.split(".");
Jahr = vektor[0];
fragjahr = "0." + vektor[1];
if (Schaltjahr(Jahr)) {xday = 366} else {xday = 365};
if (fragjahr == 0 )
{ document.Ausgabe.Erdenzeit.value = fOutM(1,1,Lang) + " " + Jahr + fOutT(0,0,0,Lang); }
else
{
DoY = modulo(fragjahr * xday,xday);
Stunde = modulo(fragjahr * 24 * xday,24);
Min = modulo(fragjahr * 1440 * xday,60);
Sec = modulo(fragjahr * 86400 * xday,60);
document.Ausgabe.Erdenzeit.value = monatmod(DoY) + " " + Jahr + fOutT(Stunde,Min,Sec,Lang);
}
}