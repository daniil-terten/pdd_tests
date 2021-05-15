<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question extends Model
{
    use HasFactory;
    protected $fillable = ['question', 'r_answer', 'w_answer1', 'w_answer2', 'w_answer3'];

}
