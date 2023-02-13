<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(){
        return response()->json([
            'status' => 200,
            'products' => Product::select('id','name','price')->get()
        ]);
    }

    public function add(Request $request){

        // return response()->json($request->all());
        // die;
        $validator = Validator::make($request->all(),[
            'name' => "required",
            'price' => "required"
        ]);
        if($validator->passes()){
            $product = new Product;
                $product->name = $request->name;
                $product->price = $request->price;
                $product->save();


            return response()->json([
                'status' => 200,
                'message' => "Success"
            ]);

        }else{
            return response()->json([
                "validation_error" => $validator->messages()
            ]);

        }
    }
    
    public function update($product_id){
        return response()->json([
            'status' => 200,
            'products' => Product::select('id','name','price')->where('id',$product_id)->first()
        ]);
    }


}
