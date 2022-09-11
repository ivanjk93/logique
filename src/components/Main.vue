<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <div class="row">
                    <div class="col-xs-6 col-md-6">
                        <router-link to="/">
                            <img src="../assets/ituneslogo.png" class="img-filter" alt="logo" width="100">
                        </router-link>
                    </div>
                    <div class="col-xs-6 col-md-6 text-right right-navbar">
                        <i id="myBtn" class="bi bi-search" @click="openModal()"></i>
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
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row mb-20">
            <div class="col-md-12 text-center">
                <h3 v-if="search === ''">List Music</h3>
                <h3 v-else>Search result for : <span class="text-primary font-weight-bold">{{ search }}</span></h3>
            </div>
        </div>
        <div class="col-xs-12 col-md-12 bg-white mb-20" v-for="(music, index) in musics" :key="index">
            <div class="position-relative">
                <img :src="music.artworkUrl100" alt="" class="img-music" @click="playMusic(music.trackViewUrl)">
                <i class="bi bi-play-circle buttonplay" @click="playMusic(music.trackViewUrl)"></i>
            </div>
            <p>{{ music.artistName }}</p>
            <p class="font-weight-bold mb-10">{{ music.trackCensoredName }}</p>
            <div class="row information">
                <div class="col-xs-6 col-md-6 pa-0">
                    <div class="badge">{{ music.primaryGenreName }}</div>
                </div>
                <div class="col-xs-6 col-md-6 pa-0">
                    <div class="badge-right text-right"><i class="bi bi-currency-dollar"></i> {{ music.collectionPrice }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            musics: [],
            search: ''
        }
    },
    created() {
        this.getValidation()
        // console.log(this.$route.hash)
        // const newUrl = this.$route.hash.slice(this.$route.hash.length, this.$route.hash.lastIndexOf('#'))
        // console.log(newUrl)
    },
    methods: {
        getValidation() {
            if(this.$route.hash !== '') {
                this.getListMusic(this.$route.hash)
            } else {
                this.getListMusic('all')
            }
        },
        getListMusic($param) {
            axios.get('https://itunes.apple.com/search?term='+$param)
            .then((response) => {
                // console.log(response.data)
                this.musics = response.data.results
            }).catch((errors) => {
                console.log(errors)
            })
        },
        playMusic($url) {
            window.open($url)
        },
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
            console.log($name)
            if($name === '') {
                this.getMusicBySearch('all')
            } else {
                this.getMusicBySearch($name)
            }
        },
        getMusicBySearch($name) {
            axios.get('https://itunes.apple.com/search?term='+$name)
            .then((response) => {
                console.log(response.data)
                this.musics.splice(0)
                this.musics = response.data.results
            }).catch((errors) => {
                console.log(errors)
            })
        },
    },
}
</script>

<style scoped>
    .position-relative {
        position: relative;
    }

    .buttonplay {
        position: absolute;
        top: 50px;
        left: 50px;
        transform: translate(-50%, -50%);
        filter: brightness(0) invert(1);
        font-size: 40px;
    }

    .border {
        border: #888 1px solid;
    }

    .information {
        display: flex;
    }

    .badge {
        background-color: green;
    }

    .badge-right {
        color: goldenrod;
    }

    .pa-0 {
        padding: 0px;
    }

    .mb-5 {
        margin-bottom: 5px;
    }

    .mb-10 {
        margin-bottom: 10px;
    }

    .mb-20 {
        margin-bottom: 20px;
    }

    .bg-white {
        border: 1px solid lightgrey;
        border-radius: 15px;
        padding: 10px;
        box-shadow: 0px 0px 15px #888888;
    }

    .img-music {
        width: 100px;
        height: 100px;
        margin: 0px 10px 0px 0px;
        border-radius: 10px;
        float: left;
    }

    .font-weight-bold {
        font-weight: 900;
    }

    .navbar {
        background-color: rgb(127,56,222);
        padding: 20px;
        color: white;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
    }

    .right-navbar {
        padding-top: 5px;
    }

    .img-filter {
        filter: brightness(0) invert(1);
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
