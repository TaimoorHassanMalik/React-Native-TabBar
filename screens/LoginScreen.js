//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, LayoutAnimation, Image } from 'react-native';
import * as firebase from 'firebase';

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        email: 'abc@gmail.com',
        password: '123123',
        errorMessage: null,
        
       
        loginLoading: false,
        loginMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }))

    }

    handleForgotPassword = async () => {
        this.setState({ loginLoading: true })

        try {
            await firebase.auth().sendPasswordResetEmail(this.state.email)
            this.setState({ errorMessage: null, loginLoading: false, loginMessage: 'An email has been sent to your Email Address' });
        } catch (e) {
            this.setState({ errorMessage: e, loginLoading: false, loginMessage: null });
        }
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                <Image
                    source={require('../assets/authHeader.png')}
                    style={{ position: 'absolute', top: -325, right: -225 }}>
                </Image>
                <Image
                    source={require('../assets/authFooter.png')}
                    style={{ position: 'absolute', bottom: -325, right: -225 }}>
                </Image>

                <Text style={styles.greeting}>
                    {'Hello again,\nWelcome back'}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
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

                <TouchableOpacity onPress={() => this.handleForgotPassword()} style={{alignItems:'center', justifyContent:'center',marginBottom:10}} >
                    <Text style={{ color: 'red', fontWeight: 'bold',  }}>Forgot Password ?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15 }}>
                        New to SocialApp ? <Text style={{ color: '#E9446A' }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMessage: {
        height: 72,
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


export default LoginScreen;
