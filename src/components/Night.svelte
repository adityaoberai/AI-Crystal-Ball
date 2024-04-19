<header>
    <div class="moon"></div>
    <div class="star"></div>
</header>

<style>
    header {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1.6rem; /* Convert 10% (px) to 1.6rem */
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    .moon {
        width: 3.75rem; /* Convert 60px to 3.75rem */
        height: 3.75rem; /* Convert 60px to 3.75rem */
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0.625rem 0 1.25rem rgba(255, 255, 255, 0.5); /* Convert 10px and 20px to 0.625rem and 1.25rem */
        position: absolute;
        top: 1.25rem; /* Convert 20px to 1.25rem */
        right: 1.25rem; /* Convert 20px to 1.25rem */
    }

    .star {
        width: 0.125rem; /* Convert 2px to 0.125rem */
        height: 0.125rem; /* Convert 2px to 0.125rem */
        background-color: white;
        border-radius: 50%;
        position: absolute;
        box-shadow:
            18.75rem 2.125rem white, 
            25rem 4.25rem white, 
            3.125rem 2.75rem white,
            28.125rem 7.5rem white, 
            37.5rem 6.5rem white, 
            43.75rem 10.25rem white, 
            50rem 2.125rem white, 
            6.25rem 1.75rem white, 
            12.5rem 3.625rem white, 
            46.875rem 12.75rem white, 
            59.375rem 5.25rem white, 
            68.75rem 9.875rem white,
            15rem 3rem white,
            20rem 4rem white, 
            30rem 5rem white, 
            40rem 6rem white,
            35rem 3rem white,
            30rem 4rem white, 
            60rem 5rem white, 
            90rem 6rem white,
            50rem 7rem white;
    }
</style>
