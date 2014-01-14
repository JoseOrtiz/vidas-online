class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :filename
      t.string :comment
      t.timestamp :upload_date

      t.timestamps
    end
  end
end
