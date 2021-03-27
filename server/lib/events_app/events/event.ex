defmodule EventsApp.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :description, :string
    field :name, :string
    field :time, :utc_datetime
    
    belongs_to :user, EventsApp.Users.User
    has_many :comments, EventsApp.Comments.Comment
    has_many :invites, EventsApp.Invites.Invite

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name, :time, :description, :user_id])
    |> validate_required([:name, :time, :description, :user_id])
  end
end
