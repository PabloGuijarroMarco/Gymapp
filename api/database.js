import * as firebase from 'firebase';

class Database {
    static getExercises(callback) {
        let ref = firebase.database().ref().child('exercises');

        var items = [];
        ref.on('value', (snap) => {
            snap.forEach((child) => {
                items.push(
                    {
                        key : child.key,
                        value : child.val()
                    }
                );
            });
            callback(items)  
        });
        
    }
    static getMachines(callback) {
        let ref = firebase.database().ref().child('machines');

        var items = [];
        ref.on('value', (snap) => {
            snap.forEach((child) => {
                items.push(
                    {
                        key : child.key,
                        value : child.val()
                    }
                );
            });
            callback(items)  
        });
        
    }
    static getMachinesById(machineId, callback) {
        let ref = firebase.database().ref().child('machines').child(machineId);

        ref.once('value', (snap) => { 
            console.log(snap.key, snap.val())
            let item = {}
            item = {
                key : snap.key,
                value : snap.val()
            }

            callback(item)
        })
        
    }

    static getPrograms(callback) {
        let ref = firebase.database().ref().child('programs');

        var items = [];
        ref.on('value', (snap) => {
            snap.forEach((child) => {
                items.push(
                    {
                        key : child.key,
                        value : child.val()
                    }
                );
            });
            callback(items)  
        });
        
    }

    static filterExercises(exercisesId, callback){
        let programExercise = exercisesId.split(',');
        let filterExercises = []
        let ref = firebase.database().ref().child('exercises');
        ref.on('value', (snap) => {
            snap.forEach((child) => {
                if(programExercise.indexOf(child.key) != -1){
                    filterExercises.push(
                        {
                            key : child.key,
                            value : child.val()
                        })
                }
            })
        });
        callback(filterExercises)

    }

    /*
    *
    *   Auth
    *
    */
    static register(email, password){
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
            var errorCode = error.errorCode;
            var errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    static logIn(email, password){
        firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
            var errorCode = error.errorCode;
            var errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    static logOut(){
        firebase.auth().signOut().catch(function(error){
            var errorCode = error.errorCode;
            var errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    static authState(callback){
        firebase.auth().onAuthStateChanged((user) => {
            callback(user);
        })
    }

    static getUserId(callback){
        let uid = firebase.auth().currentUser.uid
        callback(uid);
    }

    static getUserData(uid, callback){
        let ref = firebase.database().ref().child('users').child(uid).child('details')
        ref.once('value', (snap)=>{
            callback(snap.val())
        })
    }

    static addUserData(name){
        let uid = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref().child('users').child(uid).child('details').set({
            name : name
        });

    }

    static sendFeedBack(feedback){
        let ref = firebase.database().ref().child('feedbacks');

        ref.push({
            feedback : feedback
        })
    }
}

module.exports = Database;