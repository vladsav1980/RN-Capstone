import { View, TouchableOpacity, Text, StyleSheet,ScrollView } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <ScrollView horizontal={true}>
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
           
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 18,
         
            backgroundColor: selections[index] ? '#EE9972' : 'silver',
            borderWidth: 1,
            borderRadius:30,
            borderColor: 'white',
          }}>
          <View>
            <Text style={{ color: selections[index] ? 'black' : 'darkolivegreen' ,fontWeight:"bold",fontSize:14.5}}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
  
    flexDirection: 'row',
    alignItems: 'center',
   height:55,
   
   marginTop:5
  },
});

export default Filters;