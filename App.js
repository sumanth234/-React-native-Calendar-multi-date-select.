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
import { CalendarList } from 'react-native-calendars';
import moment from 'moment'
const deviceWidth = Dimensions.get('window').width
export default class App extends Component{

  constructor(props){
    super(props);
    if(moment().format('HH') >= 0 && moment().format('HH') < 4){
      start = moment().subtract(1, 'days').format('YYYY-MM-DD')
      end = moment().format('YYYY-MM-DD')
    }else{
        start = moment().format('YYYY-MM-DD')
        end = moment().add(1,'days').format('YYYY-MM-DD')
    }
    this.state = ({
      date:moment(),
      showModal:false,
      year:moment().year(),
      month:moment().month(),
      pastScroll:0,
      currentMonth:moment().month(),
      currentYear:moment().year(),
      dateDuration:"",
      monthInName:"",
      maxDate: moment().add(1,'years'),
      selectDate:"StartDate",
      startDate:start,
      endDate:end
    })
  }

  onMonthChange(val){
    if(val.length == 1){
      this.setState({month:moment(val[0].dateString).month(),year:moment(val[0].dateString).year()})
    }
  }
  
  render() {
    var pastScroll,min ;
    var _markedDates = {
      [moment(this.state.startDate).format('YYYY-MM-DD')]: {disabled: true}
    };
    if((moment(this.state.endDate).format('MM') - moment(this.state.startDate).format('MM')) == 0){
      for(var i=0;i<=(moment(this.state.endDate).format('DD')- moment(this.state.startDate).format('DD'));i++){
        if(i == 0 || i == (moment(this.state.endDate).format('DD')- moment(this.state.startDate).format('DD'))){
          _markedDates = {..._markedDates,[moment(this.state.startDate).add(i,'days').format('YYYY-MM-DD')]: {disabled: true,marked:true,selected:true, startingDay: true, color: '#e65c00', endingDay: true}}
        }else{
          _markedDates = {..._markedDates,[moment(this.state.startDate).add(i,'days').format('YYYY-MM-DD')]: {textColor:'#e65c00'}}
        }
      }
    }else{
      for(var i=0;i<= (moment(this.state.endDate).format('MM') - moment(this.state.startDate).format('MM'));i++){
        if(i == 0){
          for(var j=0;j<=(moment(this.state.startDate).daysInMonth() - moment(this.state.startDate).format('DD'));j++){
            if(j == 0){
              _markedDates = {..._markedDates,[moment(this.state.startDate).add(j,'days').format('YYYY-MM-DD')]: {disabled: true,marked:true,selected:true, startingDay: true, color: '#e65c00', endingDay: true}}
            }else{
              _markedDates = {..._markedDates,[moment(this.state.startDate).add(j,'days').format('YYYY-MM-DD')]:  {textColor:'#e65c00'}}
            }
          }
        }else if(i == (moment(this.state.endDate).format('MM') - moment(this.state.startDate).format('MM'))){
          for(var j=0;j<moment(this.state.endDate).format('DD');j++){
            if(j == (moment(this.state.endDate).format('DD')-1)){
              _markedDates = {..._markedDates,[moment(this.state.startDate).add(i, 'months').startOf('month').add(j,'days').format('YYYY-MM-DD')]: {disabled: true,marked:true,selected:true, startingDay: true, color: '#e65c00', endingDay: true}}
            }else{
              _markedDates = {..._markedDates,[moment(this.state.startDate).add(i, 'months').startOf('month').add(j,'days').format('YYYY-MM-DD')]:  {textColor:'#e65c00'}}
            }
          }
        }else{
          for(var j=0;j<moment(this.state.startDate).add(i,'months').daysInMonth();j++){
            _markedDates = {..._markedDates,[moment(this.state.startDate).add(i, 'months').startOf('month').add(j,'days').format('YYYY-MM-DD')]:  {textColor:'#e65c00'}}            
          }
        }
      }
    }
    if(this.state.year - this.state.currentYear  === 1){
      pastScroll=(12-(this.state.currentMonth - this.state.month))
    }else{
      pastScroll=(this.state.month - this.state.currentMonth)
    }
    if(this.state.selectDate === "StartDate"){
      if(moment(this.state.date).format('HH') >= 0 && moment(this.state.date).format('HH') < 4){
        min = moment().subtract(1, 'days').format('YYYY-MM-DD')
      }else{
        min = moment(this.state.date).format('YYYY-MM-DD')
      }
    }else{
        min = moment(this.state.startDate).format('YYYY-MM-DD')
    }
    return (
      <View style={styles.container}>
        <View style={{justifyContent:'flex-start',alignContent:'center',borderRadius:12,borderWidth:1.2,width:330,borderColor:'grey',flexDirection:'row'}}>
        <Image source={require('./calendar.png')} style={{width:30,height:30,alignSelf:'center',marginHorizontal:10}} />
          <TouchableOpacity onPress={() => {
            this.setState({showModal:true,selectDate:'StartDate'}) 
            if(this.state.year - this.state.currentYear  === 1){
              pastScroll=(12-(this.state.currentMonth - this.state.month))
            }else{
              pastScroll=(this.state.month - this.state.currentMonth)
            }
            }} style={{width:270}}>
            <TextInput underlineColorAndroid={'transparent'} editable={false} value={this.state.dateDuration} style={{color:'black'}}/>
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.showModal} style={styles.center}>
          <View style= {{height:500,width:330}}>
            <View style={{width:330,height:60,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#00001a'}}>
              <TouchableOpacity style={{flexDirection:'column',marginTop:8}} onPress={() => this.setState({selectDate:"StartDate"})}>
                {this.state.selectDate === "StartDate"? <Text style={{textAlign:'center',width:110,color:'white',fontWeight:'bold'}}>Check In</Text>: <Text style={{textAlign:'center',width:110,color:'white'}}>Check In</Text>}
                <Text style={{textAlign:'center',width:110,color:'white',fontWeight:'bold'}}>{moment(this.state.startDate).format('ddd, DD MMM')}</Text>
                {this.state.selectDate === "StartDate" ?<Image source={require('./arrow.png')} style={{width:20,height:7,alignSelf:'center',marginTop:7}} />:<View />}
              </TouchableOpacity>
              <View style={{width:110,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('./rightArrow.png')} style={{width:40,height:25}} />
              </View>
              <TouchableOpacity style={{flexDirection:'column',marginTop:8}} onPress={() => this.setState({selectDate:"EndDate"})}>
                {this.state.selectDate === "EndDate"?<Text style={{textAlign:'center',color:'white',fontWeight:'bold',width:110}}>Check Out</Text>:<Text style={{textAlign:'center',width:110,color:'white'}}>Check Out</Text>}
                <Text style={{textAlign:'center',width:110,color:'white',fontWeight:'bold'}}>{moment(this.state.endDate).format('ddd, DD MMM')}</Text>
                {this.state.selectDate === "EndDate" ?<Image source={require('./arrow.png')} style={{width:20,height:7,alignSelf:'center',marginTop:7}} />:<View />}
              </TouchableOpacity>
            </View>
            <CalendarList
              //ref={(c) => this.calendar = c}
              horizontal={true}
              pagingEnabled={true}
              current= {moment(this.state.startDate).format('YYYY-MM-DD')}
              minDate= {min}
              maxDate={moment(this.state.maxDate).format('YYYY-MM-DD')}
              onDayPress={(day) => {
                console.log("day",moment(day.dateString).format('MMMM'))
                //this.calendar.scrollToMonth("'" + moment(day.dateString).format('MMMM') + "'")
                if(this.state.selectDate ==="StartDate"){
                  this.setState({selectDate:"EndDate",startDate:(moment(day.dateString)),
                  endDate: moment(day.dateString).add(1,'days')})
                }else if(this.state.selectDate ==="EndDate"){
                  this.setState({endDate:moment(day.dateString)})
                }
                
              }}
              hideArrows={true}
              hideExtraDays={false}
              disableMonthChange={false}
              onVisibleMonthsChange={(months) => this.onMonthChange.bind(this)(months)}
              firstDay={0}
              hideDayNames={false}
              calendarWidth={330}
              calendarHeight = {400}
              pastScrollRange={pastScroll}
              futureScrollRange={12-pastScroll}
              markedDates = {_markedDates}
              //markingType={'custom'}
              // markedDates={{
              //   [moment(this.state.startDate).format('YYYY-MM-DD')] : {disabled: true,marked:true,selected:true, startingDay: true, color: '#e65c00', endingDay: true},
              //   [moment(this.state.endDate).format('YYYY-MM-DD')] : {disabled: true, startingDay: true, color: '#e65c00', endingDay: true},
              // }}
              markingType={'period'}
            />
            <View style={{width:330,height:40,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',backgroundColor:'white'}}>
              <TouchableOpacity onPress={() => this.setState({showModal:false})}>
                <Text style={{textAlign:'right',color:'grey',padding:15,fontSize:18}} >Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({showModal:false,dateDuration:(moment(this.state.startDate).format('DD MMM YYYY') + " - " + moment(this.state.endDate).format('DD MMM YYYY'))})}>
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
