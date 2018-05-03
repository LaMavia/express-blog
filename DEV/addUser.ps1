$postParams = @{
  Login = "Aniela";
  Password = "LetItGo";
  Email = "Aniela.Atkin@dev.com";

  Name = "Jon Snow";
  Desc = "I know nothing";
  BirthDate = "1572 2 16";
  Img = Get-Content -Path ./PH_img.txt | Out-String;
  Type = "User";
}

Invoke-WebRequest -Uri http://localhost:3000/api/add/user -Method POST -Body (ConvertTo-Json $postParams -Compress) -ContentType 'application/json'