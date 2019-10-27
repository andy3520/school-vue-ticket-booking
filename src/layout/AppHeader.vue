<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-3" to="/">
        <span class="display-4">
          Eco
          <i class="ni ni-bus-front-12"></i>us
        </span>
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <span class="display-4">
            Eco
            <i class="ni ni-bus-front-12"></i>us
          </span>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-auto">
        <li class="nav-item pointer">
          <router-link
            to="/"
            tag="a"
            slot="title"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <i class="fa fa-ticket d-lg-none"></i>
            <span class="nav-link-inner--text">Trang chủ</span>
          </router-link>
        </li>
        <li class="nav-item pointer">
          <router-link
            tag="a"
            to="/booking"
            slot="title"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <i class="fa fa-ticket d-lg-none"></i>
            <span class="nav-link-inner--text">Đặt Vé</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            tag="a"
            to="/search"
            slot="title"
            class="nav-link pointer"
            data-toggle="dropdown"
            role="button"
          >
            <i class="fa fa-search d-lg-none"></i>
            <span class="nav-link-inner--text">Tra cứu</span>
          </router-link>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style scoped>
.pointer:hover {
  cursor: pointer;
}
</style>
