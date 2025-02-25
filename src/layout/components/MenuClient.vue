<template>
    <div class="card border-dark border-bottom border-5 border-0 mt-2">
        <div class="card-body bg-white">
            <header>
                <div class="topbar d-flex align-items-center">
                    <div class="container">
                        <nav class="navbar navbar-expand">
                            <div class="topbar-logo-header">
                                <div class="">
                                    <img style="width: 100px;" src="../image/logo-admin.png" class="logo-icon"
                                        alt="logo icon">
                                </div>
                                <!-- <div class="">
                                    <h4 class="logo-text"></h4>
                                </div>  -->
                            </div>
                            <div class="mobile-toggle-menu"><i class="bx bx-menu"></i></div>

<!-- chức năng 1 -->
                            <!-- <ul class="nav nav-pills">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Trang chủ</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                        aria-expanded="false">Dropdown</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>
                                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                                </li>
                            </ul> -->

<!-- chức năng 2 -->
                            <a class="nav-link mt-2 ms-3 " href="">
                                <h6 type="button" class="text-danger">
                                    Trang chủ |
                                </h6>
                            </a>
                            <a href="">
                                <div class="btn-group">
                                    <h6 class=" dropdown-toggle dropdown-toggle-nocaret text-danger mt-2 ms-2" type=""
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown <i class="fa-solid fa-chevron-down"></i> |
                                        
                                </h6>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item text-primary" href="#">Menu item 1</a></li>
                                        <li><a class="dropdown-item text-primary" href="#">Menu item 2</a></li>
                                        <li><a class="dropdown-item text-primary" href="#">Menu item 3</a></li>
                                        <li><a class="dropdown-item text-primary" href="#">Menu item 4</a></li>
                                        <li><a class="dropdown-item text-primary" href="#">Menu item 5</a></li>
                                        <li><a class="dropdown-item text-primary" href="#">Menu item 6</a></li>
                                    </ul>
                                </div>
                            </a>








                            <div class="top-menu ms-auto">
                                <ul class="navbar-nav align-items-center">
                                    <li class="nav-item mobile-search-icon">
                                        <a class="nav-link" href="#"> <i class="bx bx-search"></i>
                                        </a>
                                    </li>
                                    <li class="nav-item dropdown dropdown-large">
                                        <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                                            role="button" data-bs-toggle="dropdown" aria-expanded="false"> <i
                                                class="bx bx-category"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <div class="row row-cols-3 g-3 p-3">
                                                <div class="col text-center">
                                                    <div class="app-box mx-auto bg-gradient-cosmic text-white"><i
                                                            class="bx bx-group"></i>
                                                    </div>
                                                    <div class="app-title">Teams</div>
                                                </div>
                                                <div class="col text-center">
                                                    <div class="app-box mx-auto bg-gradient-burning text-white"><i
                                                            class="bx bx-atom"></i>
                                                    </div>
                                                    <div class="app-title">Projects</div>
                                                </div>
                                                <div class="col text-center">
                                                    <div class="app-box mx-auto bg-gradient-lush text-white"><i
                                                            class="bx bx-shield"></i>
                                                    </div>
                                                    <div class="app-title">Tasks</div>
                                                </div>
                                                <div class="col text-center">
                                                    <div class="app-box mx-auto bg-gradient-kyoto text-dark"><i
                                                            class="bx bx-notification"></i>
                                                    </div>
                                                    <div class="app-title">Feeds</div>
                                                </div>
                                                <div class="col text-center">
                                                    <div class="app-box mx-auto bg-gradient-blues text-dark"><i
                                                            class="bx bx-file"></i>
                                                    </div>
                                                    <div class="app-title">Files</div>
                                                </div>
                                                <div class="col text-center">
                                                    <div class="app-box mx-auto bg-gradient-moonlit text-white"><i
                                                            class="bx bx-filter-alt"></i>
                                                    </div>
                                                    <div class="app-title">Alerts</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    
                                </ul>
                            </div>
                            <div class="user-box dropdown">
                                <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret"
                                    href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="assets/images/avatars/avatar-2.png" class="user-img" alt="user avatar">
                                    <div class="user-info ps-3">
                                        <p class="user-name mb-0">Pauline Seitz</p>
                                        <p class="designattion mb-0">Web Designer</p>
                                    </div>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="javascript:;"><i
                                                class="bx bx-user"></i><span>Profile</span></a>
                                    </li>
                                    <li><a class="dropdown-item" href="javascript:;"><i
                                                class="bx bx-cog"></i><span>Settings</span></a>
                                    </li>
                                    <li><a class="dropdown-item" href="javascript:;"><i
                                                class="bx bx-home-circle"></i><span>Dashboard</span></a>
                                    </li>
                                    <li><a class="dropdown-item" href="javascript:;"><i
                                                class="bx bx-dollar-circle"></i><span>Earnings</span></a>
                                    </li>
                                    <li><a class="dropdown-item" href="javascript:;"><i
                                                class="bx bx-download"></i><span>Downloads</span></a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider mb-0"></div>
                                    </li>
                                    <li><a class="dropdown-item" href="javascript:;"><i
                                                class="bx bx-log-out-circle"></i><span>Logout</span></a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>