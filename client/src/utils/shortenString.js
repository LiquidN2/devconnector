const shortenUrl = longUrl => {
    if (typeof longUrl === 'string' && longUrl.length > 29) {
        return longUrl.substr(0, 29) + '...';
    } else  {
        return longUrl;
    }
}

export { shortenUrl };