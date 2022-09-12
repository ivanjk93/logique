<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="test" class="container-fluid custom-app">
    <div class="row">
      <div class="col-md-12 text-center mt-100">
        <router-link to="/">
          <img src="../assets/ituneslogo.png" alt="" width="200">
        </router-link>
        <router-link to="/main">
          <button type="button" class="btn btn-white rounded custom-button text-primary">Artist / Album / Title</button>
        </router-link>
        <button type="button" id="myBtn" @click="openModal()" class="btn btn-white rounded button-search text-primary">Search</button>
        <!-- The Modal -->
        <div :id="'myModal'" class="modal">
            <!-- Modal content -->
            <div class="modal-content text-primary text-center">
                <span class="close mb-20">&times;</span>
                    <h4>Search</h4>
                <form>
                    <input type="text" class="form-control mb-20" placeholder="Artist / Album / Title" v-model="search">
                    <div class="btn btn-outline-secondary text-primary border" @click="searchMusic(search)">Search</div>
                </form> 
            </div>
        </div>
        <!-- end modal -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  components: {
    useRouter,
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    openModal() {
      this.search = ''
      var modal = document.getElementById("myModal");
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close");

      btn.onclick = function() {
      modal.style.display = "block";
      }

      span.onclick = function() {
      modal.style.display = "none";
      }

      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
    },
    searchMusic($name) {
      // console.log($name)
      if($name === '') {
          this.getMusicBySearch('all')
      } else {
          this.getMusicBySearch($name)
      }
    },
    getMusicBySearch($name) {
      axios.get('https://itunes.apple.com/search?term='+$name)
      .then((response) => {
          // console.log(response.data)
          this.$router.push({ name: 'main', params: {name: $name} })
          localStorage.setItem('stateSearch', $name)
      }).catch((errors) => {
          console.log(errors)
      })
    },
  }
}
</script>

<style scoped>
#test {
  background-image: linear-gradient(purple, white);
  height: 100vh !important;
}

.mb-20 {
  margin-bottom: 20px;
}

.border {
  border: #888 1px solid;
}

.custom-button {
  margin-top: 40%;
  border-radius: 50px;
  font-size: 20px;
  padding: 10px 50px 10px 50px;
  display: block;
}

.custom-button:active {
  background-color: brown;
  color: #ffffff;
}

.button-search {
  margin-top: 20px;
  border-radius: 50px;
  font-size: 20px;
  background-color: rgba(133,11,133, 0.1);
  padding: 10px 110px 10px 110px;
}

.button-search:active {
  background-color: brown;
  color: #ffffff;
}

.custom-app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.modal {
        display: none;
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
</style>
