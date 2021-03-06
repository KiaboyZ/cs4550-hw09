defmodule EventsApp.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :name, :string, null: false
      add :time, :utc_datetime, null: false
      add :description, :string, null: false
      add :user_id, references(:users), null: false

      timestamps()
    end

  end
end
