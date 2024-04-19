<script>
    export let data;

    let fortune = data.destiny.destiny;
    let username = data.destiny.username;

    let ogImageUrl = `http://localhost:5173/api/og/?username=${username}&destiny=${fortune}`;

    function discoverDestiny() {
        window.open('https://aicrystalball.oberai.dev', '_self');
    }

    
</script>

<svelte:head>
    <title>{username}'s Destiny</title>
    <meta name="description" content={fortune}>
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
</svelte:head>

<div class="mainContainer">
    <div class="fortune">
        <div class="fortuneMessage">
            <h1>{username}'s Destiny</h1>
            <div class="fortuneMessageBox">
                <p>{fortune}</p>
            </div>
        </div>
        <div class="fortuneButtons">
            <button on:click={discoverDestiny}>Discover your developer destiny!</button>
        </div>
    </div>
</div>