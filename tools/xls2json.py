import xlrd
import copy
import os.path
import time
import os
import sys
import codecs
import json
from collections import OrderedDict

def _row_2_object( _props, _types ):
    size = len( _types )
    obj = {}
    for i in range( size ):
        p = _props[ i ]
        t = _types[ i ].lower()
        #print( "----加载属性：" + t + " " + p )
        if( t == "int" ):
            obj[ p ] = int( 0 )
        elif( t == "float" ):
            obj[ p ] = float( 0 )
        elif( t == "long" ):
            obj[ p ] = int( 0 )
        elif( t == "bool" ):
            obj[ p ] = "false"
        elif( t == "string" ):
            obj[ p ] = ""
        #else:
            #obj[ p ] = "null"
    return obj

def _row_2_data( _data, _props, _types, _row ):
    size = len( _props )
    for i in range( size ):
        p = _props[ i ]
        t = _types[ i ].lower()
        v = _row[ i ]
        if( t == "int" ):
            if( v == "" ):
                v = 0
            _data[ p ] = int( v )
        elif( t == "float" ):
            if( v == "" ):
                v = 0
            _data[ p ] = float( v )
        elif( t == "long" ):
            if( v == "" ):
                v = 0
            _data[ p ] = int( v )
        elif( t == "bool" ):
            if( v == "" ):
                v = "FALSE"
            _data[ p ] = bool( v )
        elif( t == "string" ):
            _data[ p ] = v
        #else:
            #_data[ p ] = "null"
         
    #print( "----属性赋值：" + str( _data ) )

def xls_2_json( _path, _xls ):
    print( "--Load xlxs: " + _path + "/" + _xls )
    data = xlrd.open_workbook( _path + "/" + _xls )
    for sheet in data.sheets():
        if( sheet.name.startswith( "Sheet" ) == False and sheet.name.startswith( "None_" ) == False ):
            sheet_2_json( _path, sheet )

def sheet_2_json( _path, _sheet ):
    props = _sheet.row_values( 0 )
    types = _sheet.row_values( 1 )
    data = _row_2_object( props, types )
    
    rows = _sheet.nrows
    id_type = types[0]
    json = {}
    for r in range( 2, rows ):
        d = copy.deepcopy( data )
        _row_2_data( d, props, types, _sheet.row_values( r ) )
        id = d['id']
        if( id_type == "int" ):
            json[int(id)] = d
        elif( id_type == "float" ):
            json[float(id)] = d
        elif( id_type == "long" ):
            json[int(id)] = d
        elif( id_type == "none" ):
            skip = 0
        else:
            json[str(id)] = d
    
    file = _sheet.name + ".json"
    json_2_file( _path, json, file )
    print( "--SHEET[" + _sheet.name + "] -> " + file + "" )
    
def json_2_file( _path, _json, _file ):
    if ( not os.path.exists( _path ) ):
        os.makedirs( _path ) 
        
    f = open( _path + "/files.list", 'a', encoding='utf-8' )
    #f.write( _file.replace('.json','') + "\n" )
    f.write( _file + "\n" )
    f.close()
    
    _file = _path + "/" + _file
    with open( _file, 'w', encoding='utf-8' ) as f:
        json.dump( _json, f )
        #print( "--写入文件：" + _file )
    

def start():
    path = "./"
    for maindir, subdir, files in os.walk( path ):
        for dir in subdir:
            f = open( path + dir + "/files.list", 'w+', encoding='utf-8' )
            f.close()
            tmp_path = path + dir
            for m1, s1, f1 in os.walk( tmp_path ):
                for file in f1:
                    if( file.startswith( "~$" ) == True ):
                        skip = 0
                    elif( file.endswith( ".xls" ) == True or file.endswith( ".xlsx" ) == True ):
                        xls_2_json( tmp_path, file )

start();
    

