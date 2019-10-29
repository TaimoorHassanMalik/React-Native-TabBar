//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';


class RegisterScreen extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        name: '',
        email: '',
        password: '',
        errorMessage: null
    }
    handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.greeting}>
                        {'Hello!\nSignup to get started'}
                    </Text>

                    <TouchableOpacity
                        style={styles.avater}>
                        <Icon name="ios-add" size={52} style={{ color: 'white' }} />
                    </TouchableOpacity>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                </View>

                <View style={styles.emailContainer}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Full Name</Text>
                            <TextInput style={styles.input}
                                autoCapitalize='none'
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                            >
                            </TextInput>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput style={styles.input}
                                autoCapitalize='none'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            >
                            </TextInput>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.inputTitle}>password</Text>
                            <TextInput style={styles.input}
                                secureTextEntry
                                autoCapitalize='none'
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </View>

                </View>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity onPress={this.handleSignUp} style={styles.button}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15 }}>
                            already have account ? <Text style={{ color: '#E9446A' }}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require('../assets/authHeader.png')}
                    style={{ position: 'absolute', top: -325, right: -225 }}>
                </Image>
                <Image
                    source={require('../assets/authFooter.png')}
                    style={{ position: 'absolute', bottom: -325, right: -225 }}>
                </Image>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 2,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailContainer: {
        flex: 3,
    },
    buttonContainer: {
        flex: 2,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMessage: {
        height: 72,
        marginTop: -20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontSize: 'bold',
        fontSize: 13,
        textAlign: 'center'
    },
    avater: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#E1E2E1',
        justifyContent: 'center',
        marginTop: 2,
        alignItems: 'center',
    },
    form: {
        marginBottom: 45,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9e",
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9e',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default RegisterScreen;
