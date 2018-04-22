$PH_Body = Get-Content -Path ./ph.md | Out-String 
[string[]] $PH_Titles = @(
  "Small But Important Things To Observe In Cat",
  "What You Don't Know About Cat",
  "Things You Need To Know About Cats Today",
  "Questions To Ask a Cat",
  "You Will Never Believe This!"
)
[string[]] $PH_Images = @(
  "./images/PH/forest-l.jpeg", 
  "./images/PH/guy-l.jpeg", 
  "./images/PH/mountains-l.jpeg"
)
$n = Get-Random -Maximum $PH_Images.length
$m = Get-Random -Maximum $PH_Titles.length
$postParams = @{
  Title  = $PH_Titles[$m]; 
  Tags   = @("DEV");
  Desc   = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est nisi maxime temporibus consequatur unde minus, incidunt commodi blanditiis eaque nihil nobis hic non a veritatis quo fuga animi quos voluptate saepe nostrum facilis illo delectus facere? Exercitationem ipsa cum veritatis? Rerum beatae enim commodi ipsa exercitationem, accusamus magnam provident aspernatur.";
  Img    = $PH_Images[$n];
  Body   = $PH_Body;
  Author = "DevCat";
  Date   = "2018 7 14";
}

Invoke-WebRequest -Uri http://localhost:3000/api/add/post -Method POST -Body $postParams 