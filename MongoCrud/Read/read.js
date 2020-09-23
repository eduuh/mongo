//Methods, filters, operators;
//Query Selectors (READ)
//project Operators(READ)
//db   Collection     method     filter=> equality/single value
//db. mycollection.   find(     {age:32}   )

// db. myCollection.  find(  {age: {   $gt:     30 } } )
//                     ^                ^        ^
//                    Method         operators   value
//                  {        range filter              }

//  Read                   Update         Aggregation
// Query @ projections    update          Pipeline Status
//  Query -> find         Fields          Aggregation Modules
//  Project -> chang      Arrays

// How operators impact our Data
//  Type                purpose                  Change Data            Example
//  Query Operators     Locate data              does not               $eq
//  Project Opertors    Modify data Presentation does not               $
//  update Operators    Modify + adds data       changes                $inc

// query Selectors                 Projection Operators
//  Comparison  Evaluation              $
//  Logical     Array                 $elementMatch
//  Elements    Comments              $meta
//                                    $slice
