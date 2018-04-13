import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Keyboard,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import Modal from 'react-native-modal';
import { CalendarList } from 'react-native-calendars'
const deviceWidth = Dimensions.get('window').width
export default class App extends Component{
  constructor(props){
    super(props);
    if(new Date().getHours() >= 0 && new Date().getHours() < 4){
        start = new Date(new Date().getFullYear() + ", " + (new Date().getMonth()+1) + ", " + ((new Date().getDate())-1))
        end = new Date()
    }else{
        start = new Date()
        end = new Date(new Date().getFullYear() + ", " + (new Date().getMonth()+1) + ", " + ((new Date().getDate())+1))
    }
    this.state =({
      date:new Date(),
      showModal:false,
      year:new Date().getFullYear(),
      month:new Date().getMonth() + 1,
      pastScroll:0,
      currentMonth:new Date().getMonth() + 1,
      currentYear:new Date().getFullYear(),
      dateDuration:"",
      monthInName:"",
      maxDate: new Date().setFullYear(new Date().getFullYear() + 1),
      selectDate:"StartDate",
      startDate:start,
      endDate: end
    })
  }
  onMonthChange(val){
    if(val.length == 1){      
      this.setState({month:val[0].month,year:val[0].year})
    }
  }
  render() {
    var pastScroll,sd,ed,min ;    
    var options = {  
      weekday: "short", month: "short", day: "numeric"  
    };  
    var options1 = {
      day:"numeric",month: "short",year:"numeric"
    };
    if(this.state.year - this.state.currentYear  == 1){
      pastScroll=(12-(this.state.currentMonth - this.state.month))
    }else{
      pastScroll=(this.state.month - this.state.currentMonth)
    }
    if(this.state.startDate.getDate() <10){
      if(this.state.startDate.getMonth() < 10){
        sd = + this.state.startDate.getFullYear() + "-0" + (this.state.startDate.getMonth()+1) + "-0" +this.state.startDate.getDate()
      }else{
        sd = this.state.startDate.getFullYear() + "-" + (this.state.startDate.getMonth()+1) + "-0" +this.state.startDate.getDate()
      }
    }else{
      if(this.state.startDate.getMonth() < 10){
        sd = + this.state.startDate.getFullYear() + "-0" + (this.state.startDate.getMonth()+1) + "-" +this.state.startDate.getDate()
      }else{
        sd = this.state.startDate.getFullYear() + "-" + (this.state.startDate.getMonth()+1) + "-" +this.state.startDate.getDate()
      }
    }
    if(this.state.endDate.getDate() < 10){
      if(this.state.endDate.getMonth() < 10){
        ed = this.state.endDate.getFullYear() + "-0" + (this.state.endDate.getMonth()+1) + "-0" +this.state.endDate.getDate() 
        }else{
          ed = this.state.endDate.getFullYear() + "-" + (this.state.endDate.getMonth()+1) + "-0" +this.state.endDate.getDate() 
        }
    }else{
      if(this.state.endDate.getMonth() < 10){
        ed = this.state.endDate.getFullYear() + "-0" + (this.state.endDate.getMonth()+1) + "-" +this.state.endDate.getDate()
        }else{
        ed = this.state.endDate.getFullYear() + "-" + (this.state.endDate.getMonth()+1) + "-" +this.state.endDate.getDate() 
        }
    }
    if(this.state.selectDate === "StartDate"){
      if(this.state.date.getHours() >= 0 && this.state.date.getHours() < 4){
        min = new Date(new Date().getFullYear() + ", " + (new Date().getMonth()+1) + ", " + ((new Date().getDate())-1))
      }else{
        min = this.state.date
      }
    }else{
      min = this.state.startDate
    }
    return (
      <View style={styles.container}>
        <View style={{justifyContent:'flex-start',alignContent:'center',borderRadius:12,borderWidth:1.2,width:330,borderColor:'grey',flexDirection:'row'}}>
        <Image source={require('./calendar.png')} style={{width:30,height:30,alignSelf:'center',marginHorizontal:10}} />
          <TouchableOpacity onPress={() => this.setState({showModal:true,selectDate:'StartDate'})} style={{width:270}}>
            <TextInput underlineColorAndroid={'transparent'} editable={false} value={this.state.dateDuration} style={{color:'black'}}/>
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.showModal} style={styles.center}>
          <View style= {{height:500,width:330}}>
            <View style={{width:330,height:60,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#00001a'}}>
              <TouchableOpacity style={{flexDirection:'column',marginTop:8}} onPress={() => this.setState({selectDate:"StartDate"})}>
                {this.state.selectDate === "StartDate"? <Text style={{textAlign:'center',width:110,color:'white',fontWeight:'bold'}}>Check In</Text>: <Text style={{textAlign:'center',width:110,color:'white'}}>Check In</Text>}
                <Text style={{textAlign:'center',width:110,color:'white',fontWeight:'bold'}}>{this.state.startDate.toLocaleDateString("en-us", options)}</Text>
                {this.state.selectDate === "StartDate" ?<Image source={require('./arrow.png')} style={{width:20,height:7,alignSelf:'center',marginTop:7}} />:<View />}
              </TouchableOpacity>
              <View style={{width:110,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('./rightArrow.png')} style={{width:40,height:25}} />
              </View>
              <TouchableOpacity style={{flexDirection:'column',marginTop:8}} onPress={() => this.setState({selectDate:"EndDate"})}>
                {this.state.selectDate === "EndDate"?<Text style={{textAlign:'center',color:'white',fontWeight:'bold',width:110}}>Check Out</Text>:<Text style={{textAlign:'center',width:110,color:'white'}}>Check Out</Text>}
                <Text style={{textAlign:'center',width:110,color:'white',fontWeight:'bold'}}>{this.state.endDate.toLocaleDateString("en-us", options)}</Text>
                {this.state.selectDate === "EndDate" ?<Image source={require('./arrow.png')} style={{width:20,height:7,alignSelf:'center',marginTop:7}} />:<View />}
              </TouchableOpacity>
            </View>
            <CalendarList
              horizontal={true}
              pagingEnabled={true}
              current= {this.state.startDate}
              minDate={min}
              maxDate={this.state.maxDate}
              onDayPress={(day) => {
                if(this.state.selectDate ==="StartDate"){
                  this.setState({selectDate:"EndDate",startDate:(new Date(("'" + day.dateString + "'"))),
                  endDate: new Date(new Date(("'" + day.dateString + "'")).getFullYear() + ", " + (new Date(("'" + day.dateString + "'")).getMonth()+1) + ", " + ((new Date(("'" + day.dateString + "'")).getDate())+1))
                })
                }else if(this.state.selectDate ==="EndDate"){
                  this.setState({endDate:(new Date(("'" + day.dateString + "'")))})}
                }
              }
              hideArrows={true}
              hideExtraDays={false}
              disableMonthChange={true}
              onVisibleMonthsChange={(months) => this.onMonthChange.bind(this)(months)}
              firstDay={0}
              hideDayNames={false}
              calendarWidth={330}
              calendarHeight = {400}
              pastScrollRange={pastScroll}
              futureScrollRange={12-pastScroll}
              markedDates={{
                [sd] : {disabled: true, startingDay: true, color: '#e65c00', endingDay: true},
                [ed] : {disabled: true, startingDay: true, color: '#e65c00', endingDay: true},
              }}
              markingType={'period'}
            />
            <View style={{width:330,height:40,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',backgroundColor:'white'}}>
              <TouchableOpacity onPress={() => this.setState({showModal:false})}>
                <Text style={{textAlign:'right',color:'grey',padding:15,fontSize:18}} >Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({showModal:false,dateDuration:(this.state.startDate.toLocaleDateString("en-us", options1) + " - " + this.state.endDate.toLocaleDateString("en-us", options1))})}>
                <Text style={{textAlign:'right',color:'black',padding:15,marginRight:10,fontSize:18}} >Done</Text>
              </TouchableOpacity>
            </View>         
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
