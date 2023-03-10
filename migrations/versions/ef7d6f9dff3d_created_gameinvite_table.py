"""created gameinvite table and added creator_id foreign key to games

Revision ID: ef7d6f9dff3d
Revises: 71cc2005f52d
Create Date: 2023-03-02 18:05:02.754643

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef7d6f9dff3d'
down_revision = '71cc2005f52d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('game_invites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('inviter_id', sa.Integer(), nullable=False),
    sa.Column('invited_id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('accepted', sa.Boolean(), nullable=False),
    sa.Column('rejected', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['invited_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['inviter_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.add_column(sa.Column('creator_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'users', ['creator_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('creator_id')

    op.drop_table('game_invites')
    # ### end Alembic commands ###
