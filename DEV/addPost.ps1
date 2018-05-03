$PH_Body = Get-Content -Path ./ph.md | Out-String 
[string[]] $PH_Titles = @(
  "Small But Important Things To Observe In Cat",
  "What You Don't Know About Cat",
  "Things You Need To Know About Cats Today",
  "Questions To Ask a Cat",
  "You Will Never Believe This!",
  "20 Myths About Cheque",
  "The History Of Lilac",
  "5 Tools Everyone In The Raven Industry Should Be Using",
  "10 Signs You Should Invest In Cheque",
  "14 Common Misconceptions About Lilac"
)
[string[]] $PH_Images = @(
  "./images/PH/forest-l.jpeg", 
  "./images/PH/forest2-l.jpeg", 
  "./images/PH/guy-l.jpeg", 
  "./images/PH/mountains-l.jpeg",
  "./images/PH/legs-l.jpeg",
  "./images/PH/cam-l.jpeg",
  "./images/PH/coffee-l.jpeg",
  "./images/PH/man-l.jpeg",
  "./images/PH/mountain-l.jpeg",
  "./images/PH/road-l.jpeg",
  "./images/PH/rocks-l.jpeg",
  "./images/PH/lake-l.jpeg",
  "./images/PH/beach-l.jpeg"
  
)
[string[]] $PH_Descs = @(
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est nisi maxime temporibus consequatur unde minus, incidunt commodi blanditiis eaque nihil nobis hic non a veritatis quo fuga animi quos voluptate saepe nostrum facilis illo delectus facere? Exercitationem ipsa cum veritatis? Rerum beatae enim commodi ipsa exercitationem, accusamus magnam provident aspernatur.",

  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus, lectus sed bibendum interdum, est lacus ullamcorper leo, eu efficitur libero mi eu diam. Nulla lectus ex, faucibus vitae interdum vel, elementum id neque. Integer nec ullamcorper quam. Maecenas ac euismod nulla. Cras eu semper elit.",

  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus, lectus sed bibendum interdum, est lacus ullamcorper leo, eu efficitur libero mi eu diam. Nulla lectus ex, faucibus vitae interdum vel, elementum id neque. Integer nec ullamcorper quam. Maecenas ac euismod nulla. Cras eu semper elit. Nunc id finibus velit, at bibendum ipsum. Suspendisse volutpat dictum mi vel sodales. Nam pharetra eu tortor tristique rhoncus. Curabitur lobortis elementum neque efficitur elementum. Donec mi ligula, iaculis a leo nec, tempus accumsan ipsum.",

  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus, lectus sed bibendum interdum, est lacus ullamcorper leo, eu efficitur libero mi eu diam. Nulla lectus ex, faucibus vitae interdum vel, elementum id neque. Integer nec ullamcorper quam.",

  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus, lectus sed bibendum interdum, est lacus ullamcorper leo, eu efficitur libero mi eu diam",

  "Lorem ipsum dolor sit amet consetetur adipscing elit."
)

[string[]] $PH_Dates = @(
  "2018 7 14",
  "2018 5 3",
  "2017 8 21",
  "2018 6 12",
  "2018 6 13",
  "2018 3 2",
  "2011 8 18",
  "2016 1 27",
  "2016 4 9",
  "2017 7 29",
  "2018 6 12",
  "2017 5 29"
) 

[string[]] $PH_Authors = @(
  "DevCat", "LadyDevie", "LoremIpsolum", "Dominik Szymanowski", "BoloGliwice", "Python Master 3000", "MrFloatJP", "なにぬねの", "CardioGuy"
)

$n = Get-Random -Maximum $PH_Images.length
$m = Get-Random -Maximum $PH_Titles.length
$o = Get-Random -Maximum $PH_Descs.length
$p = Get-Random -Maximum $PH_Dates.length
$r = Get-Random -Maximum $PH_Authors.length

$postParams = @{
  Title  = $PH_Titles[$m]; 
  Tags   = @("DEV");
  Desc   = $PH_Descs[$o];
  Img    = $PH_Images[$n];
  Body   = $PH_Body;
  Author = $PH_Authors[$r];
  Date   = $PH_Dates[$p];
}

# Write-Host $postParams

Invoke-WebRequest -Uri http://localhost:3000/api/add/post -Method POST -Body $postParams -ContentType "application/json"