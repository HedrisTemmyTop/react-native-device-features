// const  getMapPreview
<MapView
style={styles.map}
initialRegion={{
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}}
>
<Marker
  coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
  title="My Location"
  description="This is a marker description"
/>
</MapView>