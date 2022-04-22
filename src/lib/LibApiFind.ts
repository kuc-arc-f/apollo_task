import moment from 'moment'

const LibApiFind = {
  convert_values: function(items: any[]){
    const ret: any[] =[]
    items.forEach(function(item){
//console.log( item )
      let row = {
        id: item._id,
        _id: item._id,
        name: item.name,
        user_id: item.user_id,
        created_at: item.created_at,
        values: '',
      }
      let values:any = {}
      item.values.forEach(function(value_item: any){
        values[value_item.name] = value_item.value
//            console.log(value_item.name , value_item.value)
      })
      row.values = JSON.stringify(values)
      ret.push(row)                        
    });        
    return ret
  },  
  convertItems: function(items: any[]){
    const ret: any[] =[]
    items.forEach(function(item){
    let dt = moment(item.created_at);
    const dtStr = dt.format("YYYY-MM-DD HH:mm")
//console.log(dt)
      item.id = item._id;
      item.created_at = dtStr;
      ret.push(item)                        
    });        
    return ret
  },
  convertItemOne: function(item: any){
    let ret ={}
    const row: any ={
      id: item._id,
      _id: item._id,
      created_at: item.created_at,
    }
    item.values.forEach(function(value_item :any){
      row[value_item.name] = value_item.value
    })
    ret = row
    return ret
  },

}
export default LibApiFind;
