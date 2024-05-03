<script>
    export let data;

    let destiny = data.destiny.destiny;
    let username = data.destiny.username;

    let ogImageUrl = `https://aicrystalball.oberai.dev/api/og/?username=${username}&destiny=${destiny}`;

    function discoverDestiny() {
        window.open('https://aicrystalball.oberai.dev', '_self');
    }

    
</script>

<svelte:head>
    <title>{username}'s Destiny</title>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@adityaoberai1" />
    <meta property="twitter:image" content={ogImageUrl} />
    <meta name="description" content="Find your developer destiny!">
    <meta property="og:image" content={ogImageUrl} />
</svelte:head>

<div class="mainContainer">
    <div class="destiny">
        <div class="destinyMessage">
            <h1>{username}'s Destiny</h1>
            <div class="destinyMessageBox">
                <p>{destiny}</p>
            </div>
        </div>
        <div class="destinyButtons">
            <button on:click={discoverDestiny}>Discover your developer destiny!</button>
        </div>
    </div>
</div>

<style>
    p {
        white-space: pre-line;
    }
</style>