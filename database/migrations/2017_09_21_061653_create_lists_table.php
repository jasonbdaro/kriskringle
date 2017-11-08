<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lists', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('user_parent_id')->unsigned();
            $table->integer('user_child_id')->unsigned();
            $table->integer('round_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();            
            $table->foreign('user_parent_id')->references('id')->on('users');
            $table->foreign('user_child_id')->references('id')->on('users');
            $table->foreign('round_id')->references('id')->on('rounds');
            $table->unique(['user_parent_id', 'user_child_id', 'round_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lists');
    }
}
