<!-- resources/views/emails/nesto.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Podaci za prijavu na profil</title>
</head>
<body>
    <h1>Dobar dan Poštovani/a, {{ $nazivRoditelja }}</h1>
    <div>U nastavku se nalaze korisničko ime i lozinka za prijavu na Vaš profil:</div>
    <p>Korisničko ime: {{ $korisnickoIme }}</p>
    <p>lozinka: {{ $lozinka }}</p>
</body>
</html>
