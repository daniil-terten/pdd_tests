<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->text('question');
            $table->text('r_answer');
            $table->text('w_answer1');
            $table->text('w_answer2')->nullable();
            $table->text('w_answer3')->nullable();
            $table->text('w_answer4')->nullable();
            $table->text('w_answer5')->nullable();
            $table->integer('theme_id')->unsigned();
            $table->text('img/path')->nullable();

            $table->foreign('theme_id')->references('id')->on('themes');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
