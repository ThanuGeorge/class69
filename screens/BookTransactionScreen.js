import React from 'react';
import { Text, View,TouchableOpacity ,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned:false,
      scanneddata:'',
      barcodebutton:"notpressed",
    }
  }
  getCamerapermissions = async() => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState(
      {
      hasCameraPermissions:status === "granted",
      barcodebutton:"clicked", 
      scanned: false
    })
  }
  handleBarCodeScanned = async({ type, data }) => {
   this.setState(
     {scanneddata:data,
      scanned:true,
      barcodebutton:"notpressed"
    })
  }
    render() {
      if(this.state.barcodebutton === "clicked" && this.state.hasCameraPermissions ){
          return(
            <BarCodeScanner onBarCodeScanned ={this.state.scanned ? undefined: this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            />
          )
      }
      else if(this.state.barcodebutton === "notpressed"){
      return (       
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
            <Text style={styles.qrtext}>
            {this.state.hasCameraPermissions === true? this.state.scanneddata: "Request for camera permission."}
            </Text>
         <TouchableOpacity style={styles.button} onPress={this.getCamerapermissions}> 
         <Text style={styles.buttonText}>Scan QR code</Text>
         </TouchableOpacity>
          
        </View>
      );
      }
    }
  }
  const styles = StyleSheet.create({
    button:{
      backgroundColor: "gray",
      padding:10,
      margin:10
    },
    qrtext:{
      fontSize:15,
      textDecorationLine:'underline',
    },
    buttonText:{
      fontSize: 20,
    }
  })