<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <title>楽楽Kakebo</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>

<body>
    <div id="app">
        <home></home>
    </div>
</body>

</html>