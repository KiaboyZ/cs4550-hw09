defmodule EventsApp.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string
    
    belongs_to :event, EventsApp.Events.Event
    belongs_to :user, EventsApp.Users.User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :user_id, :event_id])
    |> validate_required([:body, :user_id, :event_id])
  end
end
