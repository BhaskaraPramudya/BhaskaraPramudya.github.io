document.addEventListener('DOMContentLoaded', () => {
    const logo = `
        <div class="flex items-center justify-center flex-wrap p-6 bg-slate-950">
            <a href="./index.html">
                <img class="h-14" src="./asset/favicon.png" alt="Logo">
            </a>
        </div>
    `;

    const currentPage = window.location.pathname.split('/').pop(); // Mendapatkan nama file dari URL saat ini

    const navbar = `
        <nav class="bg-slate-950 p-4">
            <div class="navbar-container">
                <div class="navbar-content">
                    <a href="./choose.html" class="navbar-item ${currentPage === 'choose.html' ? 'bg-blue-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'choose.html' ? 'bg-slate-600' : 'bg-blue-600'}">Pilih Motorsport</a>
                    <a href="./f1-1.html" class="navbar-item ${currentPage === 'f1-1.html' ? 'bg-orange-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'f1-1.html' ? 'bg-slate-600' : 'bg-orange-600'}">F1 Stream 1</a>
                    <a href="./f1-2.html" class="navbar-item ${currentPage === 'f1-2.html' ? 'bg-orange-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'f1-2.html' ? 'bg-slate-600' : 'bg-orange-600'}">F1 Stream 2</a>
                    <a href="./f1-3.html" class="navbar-item ${currentPage === 'f1-3.html' ? 'bg-orange-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'f1-3.html' ? 'bg-slate-600' : 'bg-orange-600'}">F1 Stream 3</a>
                    <a href="./f1-4.html" class="navbar-item ${currentPage === 'f1-4.html' ? 'bg-orange-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'f1-4.html' ? 'bg-slate-600' : 'bg-orange-600'}">F1 Stream 4</a>
                    <a href="./f1-5.html" class="navbar-item ${currentPage === 'f1-5.html' ? 'bg-orange-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'f1-5.html' ? 'bg-slate-600' : 'bg-orange-600'}">F1 Stream 5</a>
                </div>
            </div>
        </nav>
    `;
    
    const navbar_wrc = `
        <nav class="bg-slate-950 p-4">
            <div class="navbar-wrc-container">
                <div class="navbar-wrc-content">
                    <a href="./choose.html" class="navbar-wrc-item ${currentPage === 'choose.html' ? 'bg-blue-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'choose.html' ? 'bg-slate-600' : 'bg-blue-600'}">Pilih Motorsport</a>
                    <a href="./wrc-1.html" class="navbar-wrc-item ${currentPage === 'wrc-1.html' ? 'bg-orange-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'wrc-1.html' ? 'bg-slate-600' : 'bg-orange-600'}">Rally Stream 1</a>
                    <a href="./wrc-2.html" class="navbar-wrc-item ${currentPage === 'wrc-2.html' ? 'bg-orange-500' : 'bg-slate-800'} text-white text-center font-semibold py-2 px-4 rounded-full transition-colors hover:${currentPage !== 'wrc-2.html' ? 'bg-slate-600' : 'bg-orange-600'}">Rally Stream 2</a>
                </div>
            </div>
        </nav>
    `;

    function adjustNavbar() {
        const navbarContent = document.querySelector('.navbar-content');
        const navbarWrcContent = document.querySelector('.navbar-wrc-content');

        if (navbarContent) {
            const containerWidth = navbarContent.parentElement.clientWidth;
            const contentWidth = navbarContent.scrollWidth;

            // Jika konten lebih lebar dari container, atur justify-content
            if (contentWidth > containerWidth) {
                navbarContent.style.justifyContent = 'flex-start';
            } else {
                navbarContent.style.justifyContent = 'center';
            }
        }

        if (navbarWrcContent) {
            const containerWidth = navbarWrcContent.parentElement.clientWidth;
            const contentWidth = navbarWrcContent.scrollWidth;

            // Jika konten lebih lebar dari container, atur justify-content
            if (contentWidth > containerWidth) {
                navbarWrcContent.style.justifyContent = 'flex-start';
            } else {
                navbarWrcContent.style.justifyContent = 'center';
            }
        }
    }

    // Check if elements exist before trying to set their innerHTML
    const logoElement = document.getElementById('logo');
    const navbarElement = document.getElementById('navbar');
    const navwrcElement = document.getElementById('navwrc');

    if (logoElement) logoElement.innerHTML = logo;
    if (navbarElement) navbarElement.innerHTML = navbar;
    if (navwrcElement) navwrcElement.innerHTML = navbar_wrc;

    // Jalankan fungsi saat halaman dimuat
    adjustNavbar();

    // Tambahkan event listener untuk resize
    window.addEventListener('resize', adjustNavbar);
});
